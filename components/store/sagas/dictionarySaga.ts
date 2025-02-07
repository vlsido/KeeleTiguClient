import { call, put, takeLatest } from "redux-saga/effects";
import { setCachedDictionary, setWords } from "../slices/dictionarySlice";
import { callCloudFunction } from "../../util/CloudFunctions";
import { OnlyWordsResponse, RandomWordsResponse, Word } from "../../../app/dictionary";

function* fetchAllWordsSaga() {
  try {
    const localWords = localStorage.getItem("allWords");
    if (localWords != null) {
      const words = JSON.parse(localWords);

      yield put(setWords(words));
      return;
    }

    const response = (yield call(
      callCloudFunction,
      "GetDictionaryWordsOnly_Node",
      {}
    )) as OnlyWordsResponse | null;

    if (response != null) {
      const words = response.dictionary;

      localStorage.setItem(
        "allWords",
        JSON.stringify(words)
      );

      yield put(setWords(words));
    }
  } catch (error) {
    // yield put(fetchWordsFailure(error.message));
    switch (error.code) {
      case "cloud-function/error":
        alert("Server error");

        console.error(
          "Server error",
          error
        );
        break;
      default:
        console.error(
          "Unexpected error",
          error
        );
        break;
    }
  }
}

function* fetchRandomWordsSaga() {
  try {
    const data = {
      numberOfWords: 100,
    };
    const response = (yield call(
      callCloudFunction,
      "GetRandomWords_Node",
      data
    )) as RandomWordsResponse | null;

    if (response != null) {

      const wordsData = response.randomWords.map((word: Word) => {
        return {
          word: word.word,
          type: word.type,
          forms: word.forms,
          usages: word.usages,
        };
      });

      yield put(setCachedDictionary(wordsData));
    }
  } catch (error) {
    switch (error.code) {
      case "cloud-function/error":
        alert("Server error");

        console.error(
          "Server error",
          error
        );
        break;
      default:
        console.error(
          "Unexpected error",
          error
        );
        break;
    }

  }
}

function* loadCachedWordsSaga() {
  try {
    const cachedWords = localStorage.getItem("cachedWordsAndData");
    if (cachedWords) {
      yield put(setCachedDictionary(JSON.parse(cachedWords)));
    }
  } catch (error) {
    console.error(
      "Error loading cached words:",
      error
    );
  }
}

export function* watchDictionarySaga() {
  yield takeLatest(
    "dictionary/fetchWordsRequest",
    fetchAllWordsSaga
  );

  yield takeLatest(
    "dictionary/fetchRandomWords",
    fetchRandomWordsSaga
  );

  yield takeLatest(
    "dictionary/loadCachedWords",
    loadCachedWordsSaga
  );
}
