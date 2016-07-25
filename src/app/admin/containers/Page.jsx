import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

class Page extends Component {
  render() {

    const {
      routeParams,
      pagesData
    } = this.props;

    const page = find(pagesData.pages, { 'id': routeParams.pageId });

    let pageChildren;
    if (page.hasSubPages) {
      pageChildren = pagesData.subPages.filter(el => el.pageId === page.id);
    } else {
      pageChildren = pagesData.items.filter(el => el.parentId === page.id);
    }

    return (
      (page.hasSubPages)
      ?
      <div>
        {pageChildren.map((el, i) =>
          <div key={i}>
            {el.name}
          </div>
        )}
      </div>
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

