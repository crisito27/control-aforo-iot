import json, os, sqlite3, time
import requests
import paho.mqtt.client as mqtt

MQTT_HOST=os.getenv("MQTT_HOST","mosquitto")
MQTT_PORT=int(os.getenv("MQTT_PORT","1883"))
API_BASE_URL=os.getenv("API_BASE_URL","")
DEVICE_TOKEN=os.getenv("DEVICE_TOKEN","")
DB="/data/buffer.sqlite"

db=sqlite3.connect(DB, check_same_thread=False)
db.execute("""CREATE TABLE IF NOT EXISTS pending(
 id TEXT PRIMARY KEY, payload TEXT NOT NULL, sent INTEGER DEFAULT 0
)""")
db.commit()

def store(event):
    db.execute("INSERT OR IGNORE INTO pending(id,payload,sent) VALUES(?,?,0)",
               (event["eventId"],json.dumps(event)))
    db.commit()

def flush():
    if not API_BASE_URL: return
    rows=db.execute("SELECT id,payload FROM pending WHERE sent=0 ORDER BY rowid LIMIT 100").fetchall()
    for event_id,payload in rows:
        try:
            r=requests.post(f"{API_BASE_URL}/events",data=payload,
                headers={"Content-Type":"application/json","Authorization":f"Bearer {DEVICE_TOKEN}"},timeout=8)
            if r.ok:
                db.execute("UPDATE pending SET sent=1 WHERE id=?",(event_id,)); db.commit()
        except requests.RequestException:
            break

def on_message(client, userdata, msg):
    store(json.loads(msg.payload.decode())); flush()

client=mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="sync-service")
client.on_message=on_message
client.connect(MQTT_HOST,MQTT_PORT,60)
client.subscribe("occupancy/events")
client.loop_start()
while True:
    flush(); time.sleep(10)
