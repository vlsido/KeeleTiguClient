import {
  call,
  put,
  takeLatest
} from "redux-saga/effects";
import {
  setExamDictionary,
  setWords
} from "../slices/dictionarySlice";
import { callCloudFunction } from "../../util/CloudFunctions";
import {
  OnlyWordsResponse,
  RandomWordsResponse
} from "../../../app/(tabs)/dictionary";

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
      numberOfWords: 120,
    };
    const response = (yield call(
      callCloudFunction,
      "GetRandomWords_Node",
      data
    )) as RandomWordsResponse | null;

    if (response != null) {

      console.log(
        "response.randomWords",
        response.randomWords
      );

      yield put(setExamDictionary(response.randomWords));
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
    const cachedWords = localStorage.getItem("wordsAndExamData");
    if (cachedWords) {
      yield put(setExamDictionary(JSON.parse(cachedWords)));
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
