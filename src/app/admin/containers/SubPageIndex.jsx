import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SubPageIndex extends Component {
  render() {
    const {
      pageId,
      allSubPages
    } = this.props;

    const subPages = allSubPages.filter(SP => SP.pageId === pageId); 

    return (
      <div>
        {subPages.map(subPage =>
          <div key={subPage.id}>
            {subPage.name}
          </div>
        )}
      </div>
    );
  }
}

SubPageIndex.propTypes = {
  pageId: PropTypes.string.isRequired,
  allSubPages: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  allSubPages: state.pageData.subPages  
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SubPageIndex);
