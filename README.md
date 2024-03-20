# Bloom

## Contents

- [Members](#members)
- [Technologies](#technologies)
- [Introduction](#introduction)
- [Starting the software](#starting-the-software)
  - [Available user](#available-user)
- [Usage](#usage)
  - [Purpose and goal](#purpose-and-goal)
  - [Possibilities and use cases](#possibilities-and-use-cases)
- [Application and architecture](#application-architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)

## Technologies

| Backend          | Database          |
| ---------------- | ----------------- |
| Node.JS, Express | MongoDB, Mongoose |

## Introduction

These are the frontend and the backend for BLOOM web software. BLOOM is a web application that allows students and teachers to manage their school year.

## Starting the software

In the `bloom-production` folder run the following command:

```ssh
docker compose up
```

After successfully starting the docker container you can access the website on this URL:

```ssh
http://localhost:5173/
```

To use the software please enter the credentials that are provided on the `Available User` section.

### Available User

For testing the software with an admin user please use this one:

```ssh
username: admin
password: tins
```

For testing the software with a student user please use this one:

```ssh
username: stomysander
password: tins
```

## Usage

### Purpose and goal

Initially we thought about three different user groups. `Admin`, `Teacher` and `Student`. As we are only a small team of two people and we only had one semester, we decided to focus on the admin view and the view for the students.

An `Admin` can configure basically everything.

### Possibilities and use cases

We have provided dummy data for `Classes`, `Students` and `Teacher`. For you as an admin it is possible to configure students for example. When you head to `Students` and select one specific student - for example - `Marie Nasemann`, you are able to configure the student. You can put this student in a class. After successfully signing her into a class you see a `Course Configuration Panel`. There are none available classes and no registered courses yet. You can head to `Courses` in the header and configure your first course. (note: If you want to configure a course for the user you just put into a class, remember in which class you put her into).

Now when you configure a Course you can choose a `Schoolclass Rank`. This is basically the rank for a schoolclass. If you put your user previously into - for example - `5b`, the schoolclass rank would be `5`.

The `mandatory` option: When choosing mandatory for a course, this means that all students that are assigned to the same schoolrank will be signed into this course automatically. You can check this by selecting mandatory and make sure that you have at least one student signed into a specific rank. When you create this course now for the same rank it should appear in the `Registered Course` section at the student. Furhtermore you can check if you see the student in the detail view for the specific course you have just created. You can see it in the `Student Configuration Panel`.

## Application Architecture

### Frontend

To read more about out frontend, please read from section [application and architecture](https://gitlab.mi.hdm-stuttgart.de/bloom/final/-/blob/main/frontend/README.md?ref_type=heads#application-architecture) on of the frontend project.

### Backend

To read more about out backend, please read from section [application and architecture](https://gitlab.mi.hdm-stuttgart.de/bloom/final/-/blob/main/backend/README.md?ref_type=heads#application-architecture) on of the backend project.
