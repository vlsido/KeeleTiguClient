import { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { GradeBadgeIcon } from "../icons/GradeBadgeIcon";
import { CommonColors } from "../../constants/Colors";

interface GradeBadgeProps {
  percentage: number;
}

function GradeBadge(props: GradeBadgeProps) {

  const getGrade = useCallback(() => {
    if (props.percentage >= 100) return "A+";
    else if (props.percentage >= 95) return "A";
    else if (props.percentage >= 90) return "A-";
    else if (props.percentage >= 85) return "B+";
    else if (props.percentage >= 80) return "B";
    else if (props.percentage >= 75) return "B-";
    else if (props.percentage >= 70) return "C+";
    else if (props.percentage >= 65) return "C";
    else if (props.percentage >= 60) return "C-";
    else if (props.percentage >= 55) return "D+";
    else if (props.percentage >= 50) return "D";
    else if (props.percentage >= 45) return "D-";
    else if (props.percentage >= 40) return "F+";
    else if (props.percentage >= 35) return "F";
    else { return "F-" };
  }, [props.percentage]);

  return (
    <View style={styles.container}>
      <GradeBadgeIcon />
      <View style={styles.gradeTextContainer}>
        <Text style={styles.gradeText}>
          {getGrade()}
        </Text>
      </View>
    </View>
  );
}

export default GradeBadge;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  gradeTextContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  gradeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: CommonColors.black
  }
});
