import json, os, time
from datetime import datetime, timezone
import paho.mqtt.client as mqtt

MQTT_HOST=os.getenv("MQTT_HOST","mosquitto")
MQTT_PORT=int(os.getenv("MQTT_PORT","1883"))
DEVICE_ID=os.getenv("DEVICE_ID","aforo-pi-01")
PIR_PIN=int(os.getenv("PIR_PIN","17"))
HARDWARE_MODE=os.getenv("HARDWARE_MODE","true").lower()=="true"

client=mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=f"{DEVICE_ID}-pir")
client.connect(MQTT_HOST, MQTT_PORT, 60)
client.loop_start()

def publish(detected: bool):
    payload={"deviceId":DEVICE_ID,"sensor":"pir","detected":detected,
             "timestamp":datetime.now(timezone.utc).isoformat()}
    client.publish("sensors/pir", json.dumps(payload), qos=1)

if HARDWARE_MODE:
    from gpiozero import MotionSensor
    pir=MotionSensor(PIR_PIN)
    while True:
        pir.wait_for_motion(); publish(True)
        pir.wait_for_no_motion(); publish(False)
else:
    while True:
        publish(False); time.sleep(5)
