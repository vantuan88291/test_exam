import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  ViewStyle,
} from "react-native";
import { Button, Icon, ItemTask, Row, Text } from "@components";
import { colors } from "@themes";
import {
  STACKS,
  TASK_PRIORITY,
  resetStack,
  sortDataByPriorityAndName,
  storeValueByKey,
} from "@utils";
import { DialogTask } from "./dialog-task";
import { DialogSetPriority } from "./dialog-set-priority";
import {
  processTask,
  changeNewTaskDescription,
  changeNewTaskTitle,
  changePriorityTaskSelected,
  clearNewTaskData,
  deleteTask,
  markTaskAsDone,
  setPriorityTaskSelected,
  taskSelector,
  useAppDispatch,
  useAppSelector,
  setProcessTask,
  userSelector,
} from "@redux";

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const {
    data: reduxData,
    task,
    priorityTaskSelected,
  } = useAppSelector(taskSelector);
  const { username } = useAppSelector(userSelector);

  const [isBtnAddTask, setIsBtnAddTask] = useState<boolean>(false);
  const [isDialogTask, setIsDialogTask] = useState<boolean>(false);
  const [dialogTaskMode, setDialogTaskMode] = useState<"create" | "update">(
    "create"
  );
  const [isDialogSetPriority, setIsDialogSetPriority] =
    useState<boolean>(false);

  const data = sortDataByPriorityAndName([...reduxData]);

  const handleHideBtnAddTask = (visible: boolean) => () => {
    setIsBtnAddTask(visible);
  };

  const isCloseToBottom = (event: NativeScrollEvent) => {
    const { layoutMeasurement, contentOffset, contentSize } = event;
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  };

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(nativeEvent) && isBtnAddTask) {
      setIsBtnAddTask(false);
    }
    if (!isCloseToBottom(nativeEvent) && !isBtnAddTask) {
      setIsBtnAddTask(true);
    }
  };

  const handleLogout = () => resetStack(STACKS.unauthenticated);

  useEffect(() => {
    storeValueByKey(username, JSON.stringify(data));
  }, [data.length]);

  const header = (
    <Row style={$rowHeader}>
      <Text color={colors.white}>
        Hi <Text font="semiBold" color={colors.white} text={username} />!{`\n`}
        How are you today?
      </Text>
      <Row>
        {/* <Button style={$btnFilter}>
          <Icon icon="filter" size={15} color={colors.turquoise} />
        </Button> */}
        <Button style={$btnLogout} onPress={handleLogout}>
          <Icon icon="logout" size={15} color={colors.turquoise} />
        </Button>
      </Row>
    </Row>
  );

  const handleCloseDialogTask = () => {
    setIsDialogTask(false);
    dispatch(clearNewTaskData());
  };

  const onPressComment = () => {
    Alert.alert("", "Work in progress");
  };

  const onPressSetPriority = (id: string) => {
    dispatch(setPriorityTaskSelected(id));
    setIsDialogSetPriority(true);
  };

  const onPressMarkDone = (id: string) => {
    Alert.alert("Mark as Done", "Do you want mark this task as done?", [
      {
        text: "OK",
        onPress: () => {
          dispatch(markTaskAsDone(id));
        },
      },
      { text: "Cancel" },
    ]);
  };

  const onPressDelete = (id: string) => {
    Alert.alert("Ops!", "Do you want delete this task?", [
      {
        text: "OK",
        onPress: () => {
          dispatch(deleteTask(id));
        },
      },
      { text: "Cancel" },
    ]);
  };

  const renderItemTask: ListRenderItem<any> = ({ item }) => (
    <ItemTask
      data={item}
      onPressItem={function (id: string): void {
        setIsDialogTask(true);
        setDialogTaskMode("update");
        dispatch(setProcessTask(id));
      }}
      onPressComment={onPressComment}
      onPressSetPriority={onPressSetPriority}
      onPressMarkDone={onPressMarkDone}
      onPressDelete={onPressDelete}
    />
  );

  return (
    <View style={$container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        data={sortDataByPriorityAndName([...data])}
        onScroll={onScroll}
        scrollEventThrottle={50}
        renderItem={renderItemTask}
        onEndReached={handleHideBtnAddTask(false)}
      />
      {((isBtnAddTask && data.length > 8) || data.length < 8) && (
        <Button
          style={$btnAddTask}
          onPress={() => {
            setIsDialogTask(true);
            setDialogTaskMode("create");
          }}
        >
          <Icon icon="add" size={20} color={colors.white} />
        </Button>
      )}
      <DialogTask
        mode={dialogTaskMode}
        visible={isDialogTask}
        onClose={handleCloseDialogTask}
        valueTitle={task.title}
        onChangeTitle={(text: string) => dispatch(changeNewTaskTitle(text))}
        valueDescription={task.description ?? ""}
        onChangeDescription={(text: string) =>
          dispatch(changeNewTaskDescription(text))
        }
        onAddTask={() =>
          dispatch(
            processTask({
              cb: () => setIsDialogTask(false),
              mode: dialogTaskMode,
            })
          )
        }
      />
      <DialogSetPriority
        visible={isDialogSetPriority}
        onClose={() => setIsDialogSetPriority(false)}
        priority={priorityTaskSelected.priority}
        onSelectPriority={(priority: TASK_PRIORITY) => {
          dispatch(changePriorityTaskSelected(priority));
        }}
      />
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
};

const $rowHeader: ViewStyle = {
  backgroundColor: colors.turquoise,
  paddingVertical: 24,
  paddingHorizontal: 16,
  justifyContent: "space-between",
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  marginBottom: 16,
};

const $btnFilter: ViewStyle = {
  paddingVertical: 8,
  paddingHorizontal: 8,
  backgroundColor: colors.white,
};

const $btnLogout: ViewStyle = {
  ...$btnFilter,
  marginLeft: 8,
};

const $btnAddTask: ViewStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
  paddingHorizontal: 16,
};
