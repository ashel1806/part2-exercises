import React from "react";

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total course={course.parts} />
        </div>
      ))}
    </>
  );
};

const Header = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  // console.log(course.parts)
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  // console.log(course)
  return (
    <div>
      <p>
        <strong>
          Number of exercises{" "}
          {course.map((part) => part.exercises).reduce((a, b) => a + b)}
        </strong>
      </p>
    </div>
  );
};

export default Course;
