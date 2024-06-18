The following is a list of all the databases used in our project. Instead of making a new object every year, objects in our database will persist and store a past history within their schema.

---DATABASES---

The first database is schools. As the school collections holds the classes, which change every year, it copies the classes in "grade_levels" into "past_years". "past_years" should hold all of the classes from all past years. The access code is 4 digits and used by teachers and checked against the db to allow them to register. The reintegration tracker may search into past years to track the progress of students in a school.

schools:
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
    "past_years": [
        {
        "year": "2022-2023",
        "grade_levels": [
            {
            "grade": "5",
            "classes": ["class_id1", "class_id2", ...]
            },
            ...
        ]
        },
        ...
    ]
    }


Classes will stored in one database which contains classes from all years. Each class contains info about the class and a list of students in each class.

classes:
    {
    "_id": "class_id",
    "name": "Class Name",
    "year": "2024",
    "teacher_id": "teacher_id",
    "grade_level": "Grade Level",
    "school_id": "school_id",
    "students": ["student_id1", "student_id2", ...]
    }


There will be 1 permanent student database. When a teacher adds a returning student to their roster they will be adding students from this database (they will not have access to this database directly, but through past years in their school's database). When a student transfers, a reference to a student here will be added to the transfer portal. 

students:
    {
    "_id": "MongoDB assigned id",
    "name": "Student Name",
    "guardian_name": "Guardian name",
    "guardian_contact": "7777-777-777",
    "dob": "DD/MM/YYYY",
    "student_school_id": "The school assigned id for the student",
    "disabled": true,
    "health_conditions": "Diabetes",
    "misc_info": "This student blah blah blah", 
    //These  4 should always change after each year
    "class_id": "class_id",
    "grade_level": "Grade Level",
    "school_id": "The MongoDB id for the school",
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