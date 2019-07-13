import React, { Component } from "react";
import { Consumer } from "../../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ChartReport from "./chartReport/ChartReport";
import SelectTypeReport from "./selectTypeReport/SelectTypeReport";
import AddButton from "../../layout/AddButton";
import Icons from "../../assets/svg/icons.svg";
import classes from "./Report.module.sass";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  // background: isDragging ? "black" : "green",
  // background: isDragging ? "black" : "green",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "red" : "blue",
  background: isDraggingOver ? "rgba(0,0,0,.2)" : "",
  display: "flex",
  // padding: grid,
  overflow: "auto"
});

class Report extends Component {
  constructor() {
    super();
    this.child = React.createRef();
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = { reports: [] };
  }

  handleSelectTypeReportModal = e => {
    this.child.current.handleOpenModal();
  };

  onDragEnd = (dispatch, typeReports, result, event) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      typeReports,
      result.source.index,
      result.destination.index
    );
    dispatch({ type: "TYPEREPORT", payload: items });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, typeReports, adminUrl } = value;
          return (
            <React.Fragment>
              <SelectTypeReport show={true} ref={this.child} />
              <div className={`${classes.reportContainer}`}>
                <div className={`row`}>
                  <p className={`${classes.noCardHeader} col-12 text-right`}>
                    گزارش ها
                  </p>
                </div>
                <div className={`${classes.createCardTitle} row`}>
                  <div
                    className={`${
                      classes.noCardHeaderWrapper
                    } col-5 text-right`}
                  >
                    <p className={`${classes.reportTitle} mb-0 mt-3`}>
                      از این قسمت می توانید گزارش های مربوط به سیستم را مشاهده
                      کنید:
                    </p>
                  </div>
                  <div className={`col-4 mr-auto`}>
                    <AddButton
                      label="افزودن نمودار"
                      onClick={this.handleSelectTypeReportModal}
                    />
                  </div>
                </div>

                <div style={{ direction: "ltr" }}>
                  {typeReports ? (
                    <DragDropContext
                      onDragEnd={this.onDragEnd.bind(
                        this,
                        dispatch,
                        typeReports
                      )}
                    >
                      <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className={`row`}
                          >
                            {typeReports.map((report, index) => (
                              <Draggable
                                key={report.id}
                                draggableId={report.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                    className={`col-4 mt-3`}
                                  >
                                    <ChartReport
                                      url={adminUrl}
                                      label={report.label}
                                      value={report.value}
                                      key={report.id}
                                      id={report.id}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
export default Report;
