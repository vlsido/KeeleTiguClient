# Test Conventions

These are the conventions for tests.

## Test Stack

• Jest
• React Native Testing Library
• ESLint

## General

• Tests must use the "testID" property

## Naming

### Common components

• {FILE_NAME}.{PARENT_COMPONENT}.{COMPONENT_SPECIFICATION}:{TYPE}

e.g. FOOTER.APP_BUILD:TEXT
e.g. DICTIONARY.CONTAINER:VIEW
e.g. DICTIONARY.WORD_COUNT:TEXT
e.g. DICTIONARY.WORDS_LIST:FLATLIST

### Lists

• {FILE}.{PARENT_COMPONENT}.{COMPONENT_SPECIFICATION}:{ITEM-${index}}

e.g. DICTIONARY.WORDS_LIST:ITEM-3 (Zero based index)

