import mysql.connector
import random
from datetime import datetime, timedelta

# Configuration
DB_CONFIG = {
    'user': 'root',
    'password': '2121',
    'host': 'localhost',
    'database': 'REPONT'
}

NUM_ROWS = 100100

MACHINE_NAMES = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon",
                                  "Zeta", "Eta", "Theta", "Iota", "Kappa"]

EVENT_TYPES = ['success', 'error', 'warning']

START_DATE = datetime(2025, 1, 1, 0, 0, 0)
END_DATE = datetime(2025, 4, 1, 23, 59, 59)

# Insert events into RECYCLING
seconds_range = int((END_DATE - START_DATE).total_seconds())

conn = mysql.connector.connect(**DB_CONFIG)
cursor = conn.cursor()

for _ in range(NUM_ROWS):
    machine = random.choice(MACHINE_NAMES)
    product = random.randint(1, 10)
    event_type = random.choice(EVENT_TYPES)
    event_time = START_DATE + timedelta(seconds=random.randint(0, seconds_range))
    
    cursor.execute(
        "INSERT INTO RECYCLING (machine, product, event_type, event_time) VALUES (%s, %s, %s, %s)",
        (machine, product, event_type, event_time.strftime('%Y-%m-%d %H:%M:%S'))
    )

# Commit and close
conn.commit()
cursor.close()
conn.close()
