# Bloom

## Contents

- [Members](#members)
- [Technologies](#technologies)
- [Introduction](#introduction)
- [Usage](#usage)
  - [Purpose and goal](#purpose-and-goal)
  - [Available user](#available-user)
- [Application architecture](#application-architecture)
  - [Backend](#backend)
  - [Database](#database)
- [Database schema](#database-schema)
  - [User](#user)
  - [Student](#student)
  - [Teacher](#teacher)
  - [Class](#class)
  - [Courses](#courses)
  - [Examination](#examination)
  - [Grading](#grading)
- [API](#api)
  - [User API](#user-api)
  - [Student API](#student-api)
  - [Teacher API](#teacher-api)
  - [Class API](#class-api)
  - [Course API](#course-api)
  - [Examination API](#examination-api)
- [Future work](#future-work)

## Members

| Student          | Kürzel | Matrikel-Nr. |
| ---------------- | ------ | ------------ |
| Mariya Stoyanova | ms598  | 43383        |
| Florian Winkler  | fw061  | 40141        |

# Technical documentation

## Technologies

| Backend          | Database          |
| ---------------- | ----------------- |
| Node.JS, Express | MongoDB, Mongoose |

## Introduction

This is the backend for BLOOM web software. BLOOM is a web application that allows students and teachers to manage their school year.

## Usage

### Purpose and Goal

Initially we thought about three different user groups. `Admin`, `Teacher` and `Student`. As we are only a small team of two people and we only had one semester, we decided to focus on the admin view and the view for the students.

An `Admin` can configure basically everything.

### Available User

For testing the software with an admin user please use this one:

```ssh
username: admin
password: tins
```

For testing the software with an student user please use this one:

```ssh
username: stomysander
password: tins
```

## Application Architecture

### Backend

We decided to implement our backend in NodeJS using Express.

### Database

For the database we chose MongoDB, because we found its architecture to be the best suitable for out liking. Since it's using documents and collections, it was pretty straight forward to design the schema and create the needed endpoints as well as routes for the queries we implemented.

## Database schema

![Database Schema](./documentation-images/Database%20Schema.jpg)

We have several collections, which are will be broken down in this section:

### User

The user object consists of fields for general information, like name, address and contact, but also authentication data like username, password and role.

### Student

The student is a user with the role `student`. This object includes arrays with the `courses` the student has registered for, and the `grades` as well as the student's `class`.

### Teacher

The teacher is a user with the role `teacher`. This object also includes an array with the corresponding `courses` and the `class` if the teacher is a `class teacher`.

[
There is also a user with the role `admin` who has no relations to the rest of the collections. It's job is just configuring the other objects.
]

### Class

The class collection consist of a `name` for the class, as well as the `rank` and it's `class teacher`. Every class has courses assigned to it and `announcements`, written by the teacher (see [future work](#future-work--improvements)).

### Courses

This collection includes the `name` of the course, its `short name`, as well as the `teacher` responsible for it. Furthermore it consists of arrays for the `classes`, the `students` and the `exams` it has. A course can be `mandatory` or not, has a `time` object and a relation to the `room` collection.

### Room

At first we had our `rooms` in the `courses` collection, but this way it was difficult to check if the room of a specific timeslot was free or there was already a registered course. Therefore we decided to store all the room infos in a separate collection, which consists of the `name` of the room and corresponding `timeslots` in the form of:

- monday (day):
  - one (first timeslot)
    - '08:15 - 09:45' (timeslot)
    - ObjectId<"id of a course"> (course)

### Examination

For storing all the exams we created an examination collection. Each exam has a `name`, `type`, `weight` (a number between 0.25 and 1, with stepsize of 0.25), the `grade` and a corresponding `course`.

### Grading

This collection consists of the `grade`, a relation to the `examination` collection and a corresponding `student` (see [future work](#future-work--improvements))

## API

We have configured six endpoints for the software. `user`, `student`, `teacher`, `class`, `course` and `grade`.

### User API

Endpoint `localhost:4000/api/v1/user`

```ssh
POST | /login           | Log in an existing user

POST | /                | Create a new user

PUT  | /:id             | Edit a single user

PUT  | /:id/credentials | Change user password
```

### Student API

Endpoint `localhost:4000/api/v1/student`

```ssh
GET  | /    | Fetch all students

POST | /    | Create a new student

GET  | /:id | Fetch a single student
```

### Teacher API

Endpoint `localhost:4000/api/v1/teacher`

```ssh
GET  | /    | Fetch all teachers

POST | /    | Create a new teacher

GET  | /:id | Fetch a single teacher
```

### Class API

Endpoint `localhost:4000/api/v1/class`

```ssh
GET  | /                  | Fetch all classes

POST | /                  | Create a new class

GET  | /:id               | Fetch a single class

PUT  | /:id/addStudent    | Add a student to a single class

PUT  | /:id/removeStudent | Remove a student form a single class

PUT  | /:id/addTeacher    | Add a teacher to a  single class
```

### Course API

Endpoint `localhost:4000/api/v1/course`

```ssh
GET  | /                  | Fetch all courses

POST | /                  | Create a new course

GET  | /:id               | Fetch a single course

PUT  | /:id               | Edit a single course

PUT  | /:id/addStudent    | Add a student to a single course

PUT  | /:id/removeStudent | Remove a student form a single course

PUT  | /:id/addTeacher    | Add a teacher to a single course

PUT  | /:id/removeTeacher | Remove a teacher form a single course

PUT  | /:id/addClass      | Add a class to a single course

PUT  | /:id/removeClass   | Remove a class from a single course

```

### Examination API

Endpoint `localhost:4000/api/v1/exam`

```ssh
GET  | /                          | Fetch all exams

POST | /                          | Create a new exam

GET  | /getAllExamsWithCourseKeys | Fetch all exams for a single course

GET  |                            | Fetch a single exam
```

### Grading API

Endpoint `localhost:4000/api/v1/grade`. This endpoint is currently part of our [future work](#future-work--improvements).

## Future work

- We want to add a funtionality for the grades of the students, which then will be shown in the frontend ([a future work in frontend](https://gitlab.mi.hdm-stuttgart.de/bloom/frontend/-/blob/main/README.md?ref_type=heads#future-workimprovements)).

- Another improvement would be to add the `Grade API` in order to manage students' grades.

- To be able to assign a teacher directly as a classTeacher to a class on creation.
