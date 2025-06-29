import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

export const BodyScrollView = forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollView
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        {...props}
        ref={ref}
      />
    );
  }
);
BodyScrollView.displayName = "BodyScrollView";
