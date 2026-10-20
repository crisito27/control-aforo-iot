import json, os, time, random
from datetime import datetime, timezone
import paho.mqtt.client as mqtt

MQTT_HOST=os.getenv("MQTT_HOST","mosquitto")
MQTT_PORT=int(os.getenv("MQTT_PORT","1883"))
DEVICE_ID=os.getenv("DEVICE_ID","aforo-pi-01")
TRIG_PIN=int(os.getenv("TRIG_PIN","23"))
ECHO_PIN=int(os.getenv("ECHO_PIN","24"))
HARDWARE_MODE=os.getenv("HARDWARE_MODE","true").lower()=="true"

client=mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=f"{DEVICE_ID}-ultrasonic")
client.connect(MQTT_HOST, MQTT_PORT, 60)
client.loop_start()

sensor=None
if HARDWARE_MODE:
    from gpiozero import DistanceSensor
    sensor=DistanceSensor(echo=ECHO_PIN, trigger=TRIG_PIN, max_distance=2)

while True:
    distance_cm = round(sensor.distance*100,1) if sensor else round(random.uniform(30,120),1)
    payload={"deviceId":DEVICE_ID,"sensor":"ultrasonic","distanceCm":distance_cm,
             "timestamp":datetime.now(timezone.utc).isoformat()}
    client.publish("sensors/ultrasonic", json.dumps(payload), qos=1)
    time.sleep(0.5)
