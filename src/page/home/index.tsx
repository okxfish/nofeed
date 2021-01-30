import React, { useState, useEffect, useContext } from "react";
import { default as FeedPage } from "../feed";
import { useWindowSize } from "react-use";
import { IContextualMenuProps, IIconProps } from "office-ui-fabric-react";
import { Redirect, useHistory, Route, Switch } from "react-router-dom";
import SideBarItem from "./sideBarItem";
import "./style.css";
import { ViewType, ViewTypeContext } from "../../App";

const globalNavButtonIcon: IIconProps = { iconName: "GlobalNavButton" };
const homeIcon: IIconProps = { iconName: "Home" };
const addIcon: IIconProps = { iconName: "Add" };
const searchIcon: IIconProps = { iconName: "Search" };
const syncIcon: IIconProps = { iconName: "Sync" };
const settingsIcon: IIconProps = { iconName: "Settings" };
const viewIcon: IIconProps = { iconName: "View" };

const Home = () => {
  const [isSidePaneOpen, setIsSidePaneOpen] = useState<boolean>(false);
  const [isLoaddingFeeds, setIsLoaddingFeeds] = useState<boolean>(false);
  const toggleSidePane = (): void => setIsSidePaneOpen(!isSidePaneOpen);
  const { viewType, setViewType } = useContext(ViewTypeContext);
  const { height: windowHeight } = useWindowSize();
  const history = useHistory();

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "cardView",
        text: "card view",
        iconProps: { iconName: "GridViewMedium" },
        onClick: ()=> setViewType(ViewType.card)
      },
      {
        key: "listView",
        text: "list view",
        iconProps: { iconName: "GroupedList" },
        onClick: ()=> setViewType(ViewType.list)
      },
      {
        key: "splitView",
        text: "split view",
        iconProps: { iconName: "ColumnRightTwoThirds" },
        onClick: ()=> setViewType(ViewType.threeway)
      },
      {
        key: "articleView",
        text: "article view",
        iconProps: { iconName: "ReadingMode" },
        onClick: ()=> setViewType(ViewType.magazine)
      },
    ],
  };

  useEffect(() => {
    let timeout;
    if (isLoaddingFeeds) {
      timeout = setTimeout(() => setIsLoaddingFeeds(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isLoaddingFeeds]);

  const emptyRender = (): React.ReactElement | null => null;

  const handleFeedClick = () => {
    history.replace("/feed");
  };

  const handleSearchClick = () => {
    history.replace("/search");
  };

  const handleAddClick = () => {
    history.replace("/add");
  };

  const handleSyncClick = () => {
    setIsLoaddingFeeds(true);
  };

  const handleHamburgerMenuBtnClick = () => {
    toggleSidePane();
  };

  return (
    <div
      className="home__layout w-screen overflow-hidden"
      style={{ height: windowHeight }}
    >
      <div
        className={`
          col-start-1 z-50 flex items-center justify-between bg-gray-700 transition-all
          flex-row col-span-4 row-start-3 row-span-1
          sm:flex-col sm:justify-start sm:col-span-1 sm:row-start-1  sm:row-span-3 
          ${isSidePaneOpen ? "sm:w-48 col-span-2" : "sm:w-full"}
        `}
      >
        <SideBarItem
          className="hidden sm:block"
          iconProps={globalNavButtonIcon}
          isIconOnly={!isSidePaneOpen}
          content=""
          onClick={handleHamburgerMenuBtnClick}
        >
          menu
        </SideBarItem>
        <SideBarItem
          iconProps={homeIcon}
          isIconOnly={!isSidePaneOpen}
          onClick={handleFeedClick}
        >
          feed
        </SideBarItem>
        <SideBarItem
          iconProps={searchIcon}
          isIconOnly={!isSidePaneOpen}
          onClick={handleSearchClick}
        >
          search
        </SideBarItem>
        <SideBarItem
          iconProps={addIcon}
          isIconOnly={!isSidePaneOpen}
          onClick={handleAddClick}
        >
          add
        </SideBarItem>
        <div className="hidden sm:block flex-1 flex-col w-full my-8">
          <Switch>
            <Route
              path={["/feed/:options", "/feed"]}
              render={() => (
                <>
                  <SideBarItem
                    iconProps={syncIcon}
                    isIconOnly={!isSidePaneOpen}
                    content=""
                    styles={{
                      icon: isLoaddingFeeds ? "fr-spin" : "",
                    }}
                    onClick={handleSyncClick}
                  >
                    sync
                  </SideBarItem>
                  <SideBarItem
                    iconProps={viewIcon}
                    menuProps={menuProps}
                    isIconOnly={!isSidePaneOpen}
                  >
                    view
                  </SideBarItem>
                </>
              )}
            />
          </Switch>
        </div>
        <SideBarItem
          iconProps={settingsIcon}
          isIconOnly={!isSidePaneOpen}
          content=""
          onClick={() => history.replace("/setting")}
        >
          settings
        </SideBarItem>
      </div>
      <Switch>
        <Route path={["/feed/:options", "/feed"]} component={FeedPage} />
        <Route path="/add" render={emptyRender} />
        <Route path="/search" render={emptyRender} />
        <Route path="/setting" render={emptyRender} />
        <Redirect path="/" to="/feed" exact />
      </Switch>
    </div>
  );
};

export default Home;
