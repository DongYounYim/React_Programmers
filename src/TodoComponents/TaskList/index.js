import styled from "styled-components";
import Task from "../Task";
import { useTasks } from "../TaskProvider";

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

const TaskList = (props) => {
  const { tasks } = useTasks();
  return (
    <UnorderedList {...props}>
      {tasks.map((item) => (
        <Task
          key={item.id}
          id={item.id}
          content={item.content}
          complete={item.complete}
        />
      ))}
    </UnorderedList>
  );
};

export default TaskList;
