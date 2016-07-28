import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SubPageIndex from './SubPageIndex';

class Page extends Component {
  render() {

    const {
      routeParams,
      pagesData
    } = this.props;

    const page = find(pagesData.pages, { 'id': routeParams.pageId });

    if (!page) {
      return (
        <div>loading...</div>
      );
    }

    let pageChildren;
    if (!page.hasSubPages) {
      pageChildren = pagesData.items.filter(el => el.parentId === page.id);
    }

    return (
      (page.hasSubPages)
      ?
      <SubPageIndex
        pageId={routeParams.pageId}
        />
      :
      <div>
        {pageChildren.map((el, i) =>
          <div key={i}>
            {el.itemType}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pagesData: state.pageData
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);

