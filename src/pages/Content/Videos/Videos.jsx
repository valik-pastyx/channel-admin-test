import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  Label,
  Form,
  CardSubtitle,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EmptyVideos from "./EmptyVideos";
import DeleteVideoModal from "./DeleteVideoModal";
import CreateVideo from "./CreateVideos";

const Videos = (props) => {
  const {
    changePageVideo,
    checkedItemsVideos,
    checkNameVideos,
    setCheckNameVideos,
    setChekedItemsVideos,
    handleOnDragEnd,
    handleChange,
    videosByPlaylist,
    modalDeleteVideos,
    toggleDeleteVideos,
    changeVideos,
    editNameVideos,
    setEditNameVideos,
    editDescriptionVideos,
    setEditDescriptionVideos,
    valueButtonVideos,
    onUpdateVideo,
    onAddVideoToPlaylist,
    setChangeVideo,
    modalSave,
    setModalSave,
    characters,
    dragVIdeo,
    updateDragVideo,
    onGetVideosByPlaylist,
    getPlaylist,
    setGetPlaylist,
  } = props;

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    if (
      dragVIdeo === null ||
      videosByPlaylist?.length !== dragVIdeo?.length ||
      checkNameVideos !== editNameVideos
    ) {
      updateDragVideo(videosByPlaylist);
    }
  }, [videosByPlaylist]);

  return (
    <Card className="flex-column align-items-start">
      {changeVideos ? (
        <CardBody className="w-100">
          {" "}
          <CreateVideo
            {...{
              onUpdateVideo,
              onAddVideoToPlaylist,
              setChangeVideo,
              valueButtonVideos,
              setCheckNameVideos,
              checkNameVideos,
              modalSave,
              setModalSave,
              editNameVideos,
              setEditNameVideos,
              editDescriptionVideos,
              setEditDescriptionVideos,
              setChekedItemsVideos,
              characters,
              videosByPlaylist,
              checkedItemsVideos,
              onGetVideosByPlaylist,
              getPlaylist
            }}
          />
        </CardBody>
      ) : (
        <CardBody className="w-100">
          <CardTitle>Videos</CardTitle>
          <CardSubtitle className="mb-3">
            {dragVIdeo?.length || 0} Total
          </CardSubtitle>
          <div className="btn-toolbar py-3" role="toolbar">
            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
             
            >
              <DropdownToggle caret  color="secondary mr-2"
              className="btn btn-primary waves-light waves-effect">Chose playlist<span className="arrow-down" /></DropdownToggle>
              <DropdownMenu>
                {characters?.map(c => {
                  return <DropdownItem key={c.id} onClick={() => {
                    onGetVideosByPlaylist(c.id)
                    setGetPlaylist(c.id);
                  }}>{c.name}</DropdownItem>
                })}
              </DropdownMenu>
            </ButtonDropdown>
            <Button
              color="primary mr-2"
              className="btn btn-primary waves-light waves-effect"
              value="editVideo"
              onClick={changePageVideo}
              disabled={
                checkedItemsVideos.length === 0 || checkedItemsVideos.length > 1
              }
            >
              Edit <i className="mdi mdi-dots-vertical ml-2 dots"></i>
            </Button>
            <Button
              color="primary mr-2"
              className="btn btn-primary waves-light waves-effect"
              value="newVideo"
              onClick={changePageVideo}
              disabled={
                checkedItemsVideos.length === 0 || checkedItemsVideos.length > 1
              }
            >
              <i className="dripicons-folder mr-1"></i> Add to playlist
            </Button>
            <Button
              type="button"
              color="primary"
              className="btn btn-primary waves-light waves-effect"
              onClick={toggleDeleteVideos}
              disabled={checkedItemsVideos.length === 0}
            >
              {" "}
              Delete<i className="far fa-trash-alt ml-2"></i>
            </Button>
            <DeleteVideoModal
              {...{
                checkNameVideos,
                checkedItemsVideos,
                setCheckNameVideos,
                modalDeleteVideos,
                toggleDeleteVideos,
                setChekedItemsVideos,
                videosByPlaylist,
                onGetVideosByPlaylist,
                getPlaylist
              }}
            />
          </div>

          {dragVIdeo?.length === 0 || dragVIdeo === null? (
            <EmptyVideos />
          ) : (
            <Form>
              <DragDropContext
                onDragEnd={(e) => handleOnDragEnd(e, videosByPlaylist, updateDragVideo)}
              >
                <Droppable droppableId="dragId">
                  {(provided) => (
                    <ul
                      className="message-list dragId"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {dragVIdeo &&
                        dragVIdeo?.map((p, index) => {
                          return (
                            <Draggable
                              key={p.id}
                              draggableId={String(p.vimeo_name)}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Label className="check d-flex align-items-center ml-4">
                                    <Input
                                      type="checkbox"
                                      name={p.vimeo_name}
                                      checked={checkedItemsVideos.includes(
                                        p.id
                                      )}
                                      onChange={() =>
                                        handleChange(
                                          p,
                                          checkedItemsVideos,
                                          setChekedItemsVideos
                                        )
                                      }
                                    />

                                    <span className="title mr-3">
                                      {index + 1}
                                    </span>
                                    <img
                                      src={JSON.parse(p.pictures)["100"]}
                                      className="picture"
                                    />
                                    {p.vimeo_name}
                                    <div className="col-mail col-mail-2">
                                      <div className="date">59:40</div>
                                    </div>
                                  </Label>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </Form>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default Videos;
