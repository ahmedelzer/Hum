import React from 'react';
import { View } from 'react-native';
import SuggestCard from './SuggestCard'; // adjust the path as needed
import { scale } from 'react-native-utils'; // update based on your scale function

function renderSuggestCards(suggestContainerType, items, fieldsType) {
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);

  const chunkedItems = chunkArray(items, 4);

  switch (suggestContainerType) {
    case 0:
      return (
        <>
          {items.map((item) => (
            <SuggestCard key={ item.uniqueKey} item={item} />
          ))}
        </>
      );

    case 1:
      return (
        <>
          {chunkedItems.map((group, groupIndex) => (
            <View
              key={`group-${groupIndex}`}
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: 16,
                width: '100%',
              }}
            >
              {group.map((item) => (
                <SuggestCard
                  key={item.id || item.uniqueKey}
                  item={item}
                  imageStyle={{ width: scale(90), height: scale(90) }}
                />
              ))}
            </View>
          ))}
        </>
      );

    default:
      return null;
  }
}
