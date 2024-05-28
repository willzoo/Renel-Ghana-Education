We will have two types of collections in our projects: YEARLY collections and PERMANENT collections. Yearly collections will be locked year after the year ends, and another one made in its place, while permanent databases will persist forever.

---YEARLY DATABASES---

The first yearly database is school_<year>. As the school collections holds the classes, which change every year, it is reset every year. The reintegration tracker may search into past years to track the progress of students in a school.

school_<year>:
    {
    "_id": "school_id",
    "name": "School Name",
    "access_code": "6Digit",
    "year": "2023",
    "teachers": ["teacher_id1", "teacher_id2", ...],
    "grade_levels": [
        {
        "grade": "5",
        "classes": ["class_id1", "class_id2", ...]
        },
        ...
    ]
    }