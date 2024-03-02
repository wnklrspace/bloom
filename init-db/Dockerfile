FROM mongo:5.0
ARG DATABASE_URI

ENV DATABASE_URI ${DATABASE_URI}

COPY production.courses.json /production.courses.json
COPY production.classes.json /production.classes.json
COPY production.students.json /production.students.json
COPY production.teachers.json /production.teachers.json
COPY production.exams.json /production.exams.json
COPY production.rooms.json /production.rooms.json
COPY production.users.json /production.users.json

CMD mongoimport --uri ${DATABASE_URI} --collection classes --file /production.classes.json --jsonArray && \
mongoimport --uri ${DATABASE_URI} --collection students --file /production.students.json --jsonArray && \
mongoimport --uri ${DATABASE_URI} --collection teachers --file /production.teachers.json --jsonArray && \
mongoimport --uri ${DATABASE_URI} --collection courses --file /production.courses.json --jsonArray && \
mongoimport --uri ${DATABASE_URI} --collection exams --file /production.exams.json --jsonArray && \
mongoimport --uri ${DATABASE_URI} --collection rooms --file /production.rooms.json --jsonArray && \
mongoimport --uri ${DATABASE_URI} --collection users --file /production.users.json --jsonArray

