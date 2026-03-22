import mysql.connector
import random
from datetime import datetime, timedelta

DB_CONFIG = {
    'user': 'root',
    'password': '2121',
    'host': 'localhost',
    'database': 'REPONT'
}

NUM_ROWS=100100

EVENT_TYPES = ['success', 'error', 'warning']

START_DATE = datetime(2025, 1, 1)
END_DATE = datetime(2025, 4, 1)

seconds_range = int((END_DATE - START_DATE).total_seconds())

conn = mysql.connector.connect(**DB_CONFIG)
cursor = conn.cursor()

# GET MACHINE IDs FROM DB
cursor.execute("SELECT id FROM machines")
machine_ids = [row[0] for row in cursor.fetchall()]

# GET PRODUCT IDs
cursor.execute("SELECT id FROM products")
product_ids = [row[0] for row in cursor.fetchall()]

for _ in range(NUM_ROWS):
    machine_id = random.choice(machine_ids)
    product_id = random.choice(product_ids)
    event_type = random.choice(EVENT_TYPES)

    event_time = START_DATE + timedelta(seconds=random.randint(0, seconds_range))

    cursor.execute(
        """
        INSERT INTO recycling (machine, product, event_type, event_time)
        VALUES (%s, %s, %s, %s)
        """,
        (machine_id, product_id, event_type, event_time)
    )

conn.commit()
cursor.close()
conn.close()