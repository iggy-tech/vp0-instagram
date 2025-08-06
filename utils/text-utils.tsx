import React from 'react';
import { Text } from 'react-native';

// Helper function to parse text and style hashtags
export const parseTextWithHashtags = (text, baseStyle, hashtagStyle) => {
  const words = text.split(' ');
  
  return words.map((word, index) => {
    const isHashtag = word.startsWith('#');
    const isLast = index === words.length - 1;
    
    return (
      <Text key={index}>
        <Text style={isHashtag ? hashtagStyle : baseStyle}>
          {word}
        </Text>
        {!isLast && ' '}
      </Text>
    );
  });
};

// Alternative approach using a single Text component with nested Text elements
export const renderTextWithHashtags = (text, baseStyle, hashtagStyle) => {
  const parts = text.split(/(#\w+)/g);
  
  return (
    <Text style={baseStyle}>
      {parts.map((part, index) => {
        if (part.startsWith('#')) {
          return (
            <Text key={index} style={hashtagStyle}>
              {part}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};