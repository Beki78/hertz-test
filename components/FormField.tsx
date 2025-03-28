import { View, Text, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@expo/metro-runtime";

interface FormFieldProps {
  heading: string;
  placeholder: string;
  autoComplete: string;
  phoneCode?: string;
  phoneFieldStyle?: string;
  state: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
  onEyePress?: () => void; 
}

const FormField: React.FC<FormFieldProps> = ({
  heading,
  placeholder,
  phoneCode,
  phoneFieldStyle,
  state,
  value,
  secureTextEntry,
  onEyePress,
}) => {
  return (
    <View className="">
      <Text className="text-lg font-semibold text-white">{heading}</Text>
      <View className={`bg-[#F7F8F9] rounded-xl h-14 mb-6 ${phoneFieldStyle}`}>
        {phoneCode ? <Text className="pl-3 py-2 h-[70%]">+251</Text> : null}
        <TextInput
          autoComplete="username"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          autoCapitalize="none"
          cursorColor="#7b7b8b"
          className="flex-1 p-2"
          onChangeText={state}
          value={value}
          secureTextEntry={secureTextEntry}
        />
        {secureTextEntry !== undefined && (
          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={onEyePress}
          >
            <FontAwesome
              name={secureTextEntry ? "eye-slash" : "eye"}
              size={24}
              color="#7b7b8b"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
