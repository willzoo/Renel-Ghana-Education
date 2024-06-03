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
    "students": ["student_id1", "student_id2", ...]
    }


---PERMANENT DATABASES---

There will be 1 permanent student database. When a teacher adds a returning student to their roster they will be adding students from this database (they will not have access to this database directly, but through past years in their school's database). When a student transfers, a reference to a student here will be added to the transfer portal. 

students:
    {
    "_id": "student_id",
    "name": "Student Name",
    "parent_contact": "7777-777-777",
    "dob": "DD/MM/YYYY",
    "student_school_id": "The school assigned id for the studnet",
    "disabled": true,
    "health_conditions": "Diabetes",
    "misc_info": "This student blah blah blah", 
    //These  4 should always change after each year
    "class_id": "class_id",
    "grade_level": "Grade Level",
    "school_id": "school_id",
    "inactive": false, //Whether student is active in the current term. If inactive, don't add current term to student's history.
    "history": [
        {
        "year": "2023-2024",
        "terms_present": ["1", "2", "3"],
        "class_id": "class_id_2023",
        "grade_level": "Grade Level",
        "school_id": "school_id_2023",
        //
        "health_info": "Old health info",
        "misc_info": "Old misc info"
        },
        ...
    ]
    }


There will be 1 permanent teacher database. Teachers have email and password. And list of classes they teach currently, they do not store a history of their classes.

teachers:
    {
    "_id": "teacher_id",
    "name": "Teacher Name",
    "email": "Teacher Email",
    "password": "Teacher Password",
    "school_id": "school_id",
    "classes": ["class_id1", "class_id2", ...]
    }


Simple admin collection for renel ghana to login.

admin:
    {
    "_id": "admin_id",
    "email": "Admin Email",
    "password": "Admin Password"
    }


The transfers collection stores all the transfer students in the system. When a student transfers, Renel admins can add students to this portal. The teacher sees this transfer portal and can add the transfer student into their class (upon which they are removed from this collection).

transfers:
    {
    "_id": "transfer_id",
    "students": [
        {
            "student": "student_id1",
            "verified_teacher": "teacher_id1"
        },
        ...
    ]
    }