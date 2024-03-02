<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Grades',
        path: '/grades',
      },
    ]"
  />
    <div class="container">
      <img src="../assets/under-construction.png" alt="Under Construction" class="construction-img">
      <h1>404 - Page Not Found</h1>
      <p>Oops! Looks like this page is under construction.</p>
      <p>Our team of cute little workers is busy building it.</p>
      <p>Please check back later!</p>
    </div>
  </template>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 50px;
  }
  
  .construction-img {
    width: 10%;
    margin-bottom: 20px;
  }
  </style>
  