We will have two types of collections in our projects: YEARLY collections and PERMANENT collections. Yearly collections will be locked year after the year ends, and another one made in its place, while permanent databases will persist forever.

---YEARLY DATABASES---

The first yearly database is school_<year>. As the school collections holds the classes, which change every year, it is reset every year. The reintegration tracker may search into past years to track the progress of students in a school.

school_<year>:
    {
    "_id": "school_id",
    "name": "School Name",
    "access_code": "4Digit",
    "year": "2023-2024",
    "teachers": ["teacher_id1", "teacher_id2", ...],
    "grade_levels": [
        {
        "grade": "5",
        "classes": ["class_id1", "class_id2", ...]
        },
        ...
    ]
    }


Classes will also be stored in yearly databases that are archived after every year. Each class lasts for 3 terms. The term list stores term 1, 2, and 3. Each term is where students are stored, in case students drop out between terms.

classes_<year>:
    {
    "_id": "class_id",
    "name": "Class Name",
    "teacher_id": "teacher_id",
    "grade_level": "Grade Level",
    "school_id": "school_id",
    "terms": [
        {
        "term": "1",
        "students": ["student_id1", "student_id2", ...]
        },
        ...
    ]
    }


---PERMANANENT DATABASES---

students:
    {
    "_id": "student_id",
    "name": "Student Name",
    "current_class_id": "class_id",
    "current_grade_level": "Grade Level",
    "current_school_id": "school_id",
    "history": [
        {
        "year": "2023-2024",
        "term": "3",
        "class_id": "class_id_2023",
        "teacher_id": "teacher_id",
        "grade_level": "Grade Level",
        "school_id": "school_id_2023"
        },
        ...
    ]
    }


The transfers_<year> collection stores all the transfer students in the system. When a student transfers, Renel admins can add students to this portal. The teacher sees this transfer portal and can add the transfer student into their class (upon which they are removed from this collection).

transfers_<year>:
    {
    "_id": "class_id",
    "students": ["student_id1", "student_id2", ...]
    }