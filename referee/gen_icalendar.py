from icalendar import Calendar, Event, vCalAddress, vText
from datetime import datetime, timedelta
from dateutil.parser import parse
import uuid

# Define a list of dictionaries with school names and deadlines.
# This mimics the data provided in the prompt's table.
schools = [
    {"name": "University of Iowa", "deadline": "January 15, 2026"},
    {"name": "University of Colorado Boulder", "deadline": "December 1, 2025"},
    {"name": "Colorado State University", "deadline": "TBD"},
    {"name": "Oklahoma State University", "deadline": "February 1, 2026"},
    {"name": "University of Arkansas", "deadline": "February 1, 2026"},
    {"name": "University of Utah", "deadline": "January 1, 2026"},
    {"name": "University of California, Los Angeles", "deadline": "December 13, 2025"},
    {"name": "University of Michigan", "deadline": "February 1, 2026"},
    {"name": "University of Arizona", "deadline": "January 1, 2026"},
    {"name": "Brown University", "deadline": "December 8, 2025"},
    {"name": "Ohio State University", "deadline": "December 5, 2025"},
    {"name": "Pennsylvania State University", "deadline": "January 5, 2026"},
    {"name": "McGill University", "deadline": "January 15, 2026"},
    {"name": "Concordia University", "deadline": "October 3, 2025"},
    {"name": "University of Bonn", "deadline": "January 15, 2026"},
    {"name": "Berlin Mathematical School", "deadline": "December 1, 2025"},
    {"name": "ALGANT", "deadline": "January 31, 2026"},
    {"name": "Heidelberg University (Germany)", "deadline": "TBD"},
    {"name": "Universität Duisburg-Essen", "deadline": "TBD"},
    {"name": "University of Münster", "deadline": "January 15, 2026"},
    {"name": "University of Padua", "deadline": "TBD"},
]

# Create a Calendar object
cal = Calendar()
cal.add('prodid', '-//My Reference Letter Calendar//EN')
cal.add('version', '2.0')

# Loop through the list of schools
for school in schools:
    school_name = school["name"]
    deadline_str = school["deadline"]

    # Skip entries with TBD or conditional deadlines
    if "TBD" in deadline_str or "within 14 days" in deadline_str:
        print(f"Skipping {school_name} due to an invalid or conditional deadline.")
        continue

    try:
        # Parse the deadline string into a datetime object
        # dateutil.parser handles various date formats automatically
        deadline_dt = parse(deadline_str)
        
        # Calculate the event date (22 days before the deadline)
        event_dt = deadline_dt - timedelta(days=22)
        
        # Create an iCalendar Event object
        event = Event()
        event.add('summary', f"Reference for {school_name}")
        event.add('dtstart', event_dt.date())
        event.add('dtend', event_dt.date() + timedelta(days=1)) # All-day event
        event.add('dtstamp', datetime.now())
        event.add('uid', str(uuid.uuid4()))
        event.add('location', school_name)
        
        description = f"Please submit the reference letter for Yanshu Wang's application to the {school_name}'s program. Deadline is {deadline_str}."
        event.add('description', description)

        # Add the event to the calendar
        cal.add_component(event)

    except (ValueError, TypeError) as e:
        print(f"Could not parse date for {school_name}: {e}")
        continue

# Save the iCalendar file
file_name = "reference_letter_notifications.ics"
with open(file_name, 'wb') as f:
    f.write(cal.to_ical())

print(f"\niCalendar file '{file_name}' has been created successfully.")
