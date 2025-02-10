import { View } from "react-native";
import ExamLink from "./links/ExamLink";
import DictionaryLink from "./links/DictionaryLink";
import SearchLink from "./links/SearchLink";

function Header() {

  return (
    <View testID="HEADER.CONTAINER:VIEW" style={{ flexDirection: "row" }}>
      <ExamLink />
      <DictionaryLink />
      <SearchLink />
    </View>
  );
}

export default Header;
