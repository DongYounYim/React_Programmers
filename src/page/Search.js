import { useState } from "react";
import Header from "../SeaerchComponents/Header";
import SearchBox from "../SeaerchComponents/SearchBox";
import EmojiList from "../SeaerchComponents/EmojiList";
import emojiJson from "../data/emojiList.json";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <Header />
      <SearchBox onSearch={setKeyword} />
      <EmojiList emojis={emojiJson} keyword={keyword} />
    </>
  );
};

export default Search;
