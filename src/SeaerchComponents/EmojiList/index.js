import styled from "styled-components";
import EmojiListItem from "../EmojiListItem";

const Container = styled.ul`
  width: 100%;
  padding: 0;
`;

const EmojiList = ({ emojis, keyword }) => {
  return (
    <Container>
      {emojis
        .filter(
          (emoji) =>
            emoji.title.indexOf(keyword) >= 0 ||
            emoji.keywords.indexOf(keyword) >= 0
        )
        .slice(0, 10)
        .map((emoji) => (
          <EmojiListItem key={emoji.title} emoji={emoji} />
        ))}
    </Container>
  );
};

export default EmojiList;
