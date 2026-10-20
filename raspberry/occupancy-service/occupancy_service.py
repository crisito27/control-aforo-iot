import json, os, time, uuid
from datetime import datetime, timezone
import paho.mqtt.client as mqtt

MQTT_HOST=os.getenv("MQTT_HOST","mosquitto")
MQTT_PORT=int(os.getenv("MQTT_PORT","1883"))
DEVICE_ID=os.getenv("DEVICE_ID","aforo-pi-01")
THRESHOLD=float(os.getenv("DISTANCE_THRESHOLD_CM","60"))
CAPACITY=int(os.getenv("CAPACITY","20"))

occupancy=0
last_pir_at=0.0
near=False
cooldown_until=0.0

client=mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=f"{DEVICE_ID}-occupancy")

def emit(kind):
    global occupancy
    occupancy=max(0,min(CAPACITY,occupancy+(1 if kind=="ENTRY" else -1)))
    status="FULL" if occupancy>=CAPACITY else ("WARNING" if occupancy>=CAPACITY*0.8 else "AVAILABLE")
    event={"eventId":str(uuid.uuid4()),"deviceId":DEVICE_ID,"type":kind,
           "occupancy":occupancy,"capacity":CAPACITY,"status":status,
           "timestamp":datetime.now(timezone.utc).isoformat()}
    client.publish("occupancy/events", json.dumps(event), qos=1)

def on_message(client, userdata, msg):
    global last_pir_at, near, cooldown_until
    now=time.time()
    data=json.loads(msg.payload.decode())
    if msg.topic=="sensors/pir" and data.get("detected"):
        last_pir_at=now
        if near and now>=cooldown_until:
            emit("EXIT"); cooldown_until=now+2.5
    elif msg.topic=="sensors/ultrasonic":
        is_near=float(data.get("distanceCm",999))<=THRESHOLD
        if is_near and not near and now>=cooldown_until:
            if 0 < now-last_pir_at <= 2.0:
                emit("ENTRY"); cooldown_until=now+2.5
        near=is_near

client.on_message=on_message
client.connect(MQTT_HOST,MQTT_PORT,60)
client.subscribe("sensors/#")
client.loop_forever()
