import React, { memo, useRef, useState } from "react";
import { View, ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { colors } from "@themes";
import { IData } from "@redux";
import { TASK_PRIORITY, TASK_STATUS } from "@utils";
import { Row } from "../row/row";
import { Button } from "../button/button";
import { Text } from "../text/text";
import { Icon } from "../icon/icon";

export interface ItemTaskProps {
  style?: ViewStyle | ViewStyle[];
  data: IData;
  onPressItem: (id: string) => void;
  onPressComment: (id: string) => void;
  onPressSetPriority: (id: string) => void;
  onPressMarkDone: (id: string) => void;
  onPressDelete: (id: string) => void;
}

export const ItemTask = memo(function (props: ItemTaskProps) {
  const {
    style,
    data,
    onPressItem = () => {},
    onPressComment = () => {},
    onPressSetPriority = () => {},
    onPressMarkDone = () => {},
    onPressDelete = () => {},
  } = props;

  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  const refButton = useRef<Swipeable>(null);

  const handleSetPriority = () => {
    onPressSetPriority(data.id);
    refButton?.current?.close();
  };

  const handleDone = () => {
    onPressMarkDone(data.id);
    refButton?.current?.close();
  };

  const handleDelete = () => {
    onPressDelete(data.id);
    refButton?.current?.close();
  };

  const renderRightActions = () => {
    return (
      <Row style={$rowAct}>
        {data.status !== TASK_STATUS.done && (
          <>
            <Button style={$btnAct} onPress={handleSetPriority}>
              <Icon size={25} icon="priority" />
            </Button>
            <Button style={$btnAct} onPress={handleDone}>
              <Icon size={25} icon="markDone" />
            </Button>
          </>
        )}
        <Button style={$btnAct} onPress={handleDelete}>
          <Icon size={25} icon="delete" />
        </Button>
      </Row>
    );
  };

  const handleOpenRightAct = () => {
    refButton?.current?.openRight();
  };

  const handleSwipeableAct = (visible: boolean) => () =>
    setIsRightOpen(visible);

  return (
    <Swipeable
      containerStyle={[$container, style]}
      ref={refButton}
      overshootLeft={false}
      overshootRight={false}
      onSwipeableWillOpen={handleSwipeableAct(true)}
      onSwipeableWillClose={handleSwipeableAct(false)}
      renderRightActions={renderRightActions}
    >
      <Button style={$btn} onPress={() => onPressItem(data.id)}>
        <Row style={$rowContent}>
          <Row>
            <View
              style={{ ...$bar, backgroundColor: $barColor[data.status] }}
            />
            <View>
              <Text text={data.title} />
              <Text
                size={12}
                color={colors.darkGray}
                text={data.description || "*No description*"}
              />
            </View>
          </Row>
          <Row>
            <View
              style={{
                ...$dotStatus,
                backgroundColor: $priorityColor[data.priority],
              }}
            />
            <Button style={$btnAct} onPress={() => onPressComment(data.id)}>
              <Icon size={25} icon="comment" />
            </Button>
            {!isRightOpen && (
              <Button style={$btnAct} onPress={handleOpenRightAct}>
                <Icon size={25} icon="threeDots" />
              </Button>
            )}
          </Row>
        </Row>
      </Button>
    </Swipeable>
  );
});

const $container: ViewStyle = {
  marginBottom: 8,
  marginHorizontal: 8,
};

const $btn: ViewStyle = {
  paddingVertical: 0,
  paddingHorizontal: 0,
  backgroundColor: colors.white,
};

const $rowAct: ViewStyle = { paddingRight: 16 };

const $rowContent: ViewStyle = {
  justifyContent: "space-between",
  backgroundColor: colors.white,
};

const $dotStatus: ViewStyle = {
  height: 10,
  width: 10,
  borderRadius: 5,
};

const $bar: ViewStyle = {
  width: 4,
  height: 60,
  marginRight: 8,
  backgroundColor: colors.turquoise,
};

const $btnAct: ViewStyle = {
  paddingHorizontal: 0,
  paddingVertical: 0,
  borderRadius: 0,
  marginLeft: 16,
  backgroundColor: colors.transparent,
};

const $barColor = {
  [TASK_STATUS.doing]: colors.pavlova,
  [TASK_STATUS.done]: colors.turquoise,
};

const $priorityColor = {
  [TASK_PRIORITY.low]: colors.lightBlue,
  [TASK_PRIORITY.medium]: colors.turquoise,
  [TASK_PRIORITY.high]: colors.red,
};
