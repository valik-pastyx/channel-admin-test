import React, { useEffect, useState, useRef } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  Card,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  FormGroup,
  Container,
  Input,
  Label,
  Form,
  CardSubtitle,
  Table,
} from "reactstrap";
import "./content.scss";
import CreatePlaylist from "./CreatePlaylist";
import selectors from "../../selectors";
import Actions from "../../store/actions";
import { withNamespaces } from "react-i18next";
import { DeletePlaylistModal } from "./DeletePlaylistModal";
import EditPlaylistModal from "./EditPlaylistModal";

const Content = React.memo((props) => {
  const checkRef = useRef();
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const {
    activeChannel,
    onAddPlaylist,
    playlists,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
  } = props;
  const [playlistName, setPlaylistName] = useState("");
  const [newPlaylist, setnewPlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [check, checkSet] = useState("");

  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleEdit = () => setModalEdit(!modalEdit);

  const prevPlaylists = usePrevious(playlistName);

  // useEffect(() => {
  //   if (prevPlaylists !== playlistName) {
  //     onGetPlaylist(playlistName);
  //   }
  //   console.log();
  // }, [prevPlaylists, playlistName, onGetPlaylist]);

  const renderContent = () => {
    return (
      <Row className="align-items-start">
        <Col xs="12" sm="4" md="3" lg="2">
          <Card>
            <CardBody>
              <Nav className="border-0" vertical pills tabs>
                <NavItem>
                  <Button className="w-100 mb-4" color="success">
                    Upload
                  </Button>
                </NavItem>
                <NavItem className="d-flex justify-content-between align-items-baseline">
                  <NavLink className="px-0">
                    <i className="dripicons-star mr-2"></i> Playlists
                  </NavLink>
                  <span>({playlists?.length})</span>
                </NavItem>
                <NavItem className="d-flex justify-content-between align-items-baseline">
                  <NavLink className="px-0">
                    <i className=" dripicons-jewel mr-2"></i> Videos
                  </NavLink>
                  <span>({0})</span>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="8" md="9" lg="10">
          {newPlaylist ? (
            <CreatePlaylist
              activeChannel={activeChannel}
              onAddPlaylist={onAddPlaylist}
            />
          ) : (
            <TabContent activeTab="1">
              <TabPane tabId="1">
                <Card className="flex-column align-items-start">
                  <CardBody className="w-100">
                    <CardTitle>Playlists</CardTitle>
                    <CardSubtitle className="mb-3">
                      {playlists?.length} Total
                    </CardSubtitle>
                    <Nav>
                      <NavItem>
                        <Button
                          color="primary mr-2"
                          onClick={() => setnewPlaylist({ newPlaylist: true })}
                        >
                          New Playlist
                        </Button>
                      </NavItem>
                      <NavItem>
                        <Button color="primary mr-2" onClick={toggleEdit}>
                          Edit
                        </Button>
                        <EditPlaylistModal
                          {...{
                            check,
                            checkSet,
                            modalEdit,
                            setPlaylistName,
                            toggleEdit,
                            onUpdatePlaylist,
                            onGetPlaylist
                          }}
                        />
                      </NavItem>
                      <NavItem>
                        <Button color="primary" onClick={toggleDelete}>
                          Delete
                        </Button>
                        <DeletePlaylistModal
                          {...{
                            check,
                            modalDelete,
                            toggleDelete,
                            onPlaylistDelete,
                          }}
                        />
                      </NavItem>
                    </Nav>
                    <Form>
                      <Table hover className="mt-3">
                        <tbody>
                          {playlists?.length
                            ? playlists?.map((p) => {
                                return (
                                  <tr key={p.id} className="d-flex justify-content-between playlist">
                                    <th className="border-0 px-0">
                                      <FormGroup check>
                                        <Label check>
                                          <Input
                                            type="checkbox"
                                            value={check.name}
                                            checked={check.id == p.id ? true : false}
                                            onChange={() => {
                                              checkSet(p)
                                            }}
                                          />{" "}
                                          {p.name}
                                        </Label>
                                      </FormGroup>
                                    </th>
                                    <th className="border-0 px-0">
                                      <span>4 items</span>
                                    </th>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </Table>
                    </Form>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>
          )}
        </Col>
      </Row>
    );
  };

  const renderEmptyContentMessage = () => (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          You haven`t any playlist yet.
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button color="primary" className="waves-effect">
              <i className="bx bx-plus font-size-16 align-middle mr-2" />
              Creacte a new playlist
            </Button>
          </Link>
        </div>
      </CardBody>
    </div>
  );

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"content"} />
          {Boolean(true) ? renderContent() : renderEmptyContentMessage()}
        </Container>
      </div>
    </>
  );
});

const mapStatetoProps = (state) => ({
  playlists: selectors.playlists.playlists(state),
  activeChannel: selectors.channels.activeChannel(state),
  activePlaylist: selectors.playlists.activePlaylist(state)
});

const mapDispatchToProps = (dispatch) => ({
  onAddPlaylist: (data) => dispatch(Actions.playlists.addPlaylistRequest(data)),
  onPlaylistDelete: (data) =>
    dispatch(Actions.playlists.deletePlaylistRequest(data)),
  onUpdatePlaylist: (data) =>
    dispatch(Actions.playlists.updatePlaylistRequest(data)),
  onGetPlaylist: () => dispatch(Actions.playlists.getPlaylistsRequest()),
  setActivePlaylist: (data) =>
    dispatch(Actions.playlists.setActivePlaylis(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
