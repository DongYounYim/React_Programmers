import styled from "styled-components";
import Header from "../TodoComponents/Header";
import NewTaskForm from "../TodoComponents/NewTaskForm";
import TaskList from "../TodoComponents/TaskList";
import TaskProvider from "../TodoComponents/TaskProvider/index.js";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const Todo = () => {
  return (
    <>
      <TaskProvider>
        <Container>
          <Header>Todo</Header>
          <NewTaskForm />
          <TaskList css={{ marginTop: "16px" }} />
        </Container>
      </TaskProvider>
    </>
  );
};

export default Todo;
