import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

const people = [
  {
    PersonID: 1,
    FirstName: "John",
    LastName: "Doe",
    MemberTypeName: "Team Leader",
    ProfileImage: "https://via.placeholder.com/150",
  },
  {
    PersonID: 2,
    FirstName: "Jane",
    LastName: "Smith",
    MemberTypeName: "Designer",
    ProfileImage: "https://via.placeholder.com/150",
  },
  // Add more team members here
];

const InfoCard = ({ people }) => {
  return (
    <View className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {people?.map((person) => (
        <View
          key={person.PersonID}
          className="rounded-lg bg-card shadow-md overflow-auto mb-8"
        >
          {person.ProfileImage && (
            <View className="items-center justify-center -mt-12">
              <Image
                source={{ uri: person.ProfileImage }}
                className="w-32 h-32 rounded-full shadow-lg"
              />
            </View>
          )}

          <View className="p-4 items-center">
            {person.FirstName && (
              <Text className="text-lg font-bold text-accent">
                {person.FirstName + " " + person.LastName}
              </Text>
            )}
            <Text className="text-sm mb-4">{person.MemberTypeName}</Text>

            <View className="flex-row justify-center">
              <TouchableOpacity className="mx-2">
                {/* Replace with actual icons */}
                <Text className="text-primary-custom">FB</Text>
              </TouchableOpacity>
              <TouchableOpacity className="mx-2">
                <Text className="text-primary-custom">TW</Text>
              </TouchableOpacity>
              <TouchableOpacity className="mx-2">
                <Text className="text-primary-custom">LI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default InfoCard;
