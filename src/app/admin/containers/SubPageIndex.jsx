import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubPage from '../../shared/components/SubPage';

class SubPageIndex extends Component {
  render() {
    const {
      pageId,
      allSubPages
    } = this.props;

    const subPages = allSubPages.filter(SP => SP.pageId === pageId); 

    return (
      <div className="sub-page-index">
        {subPages.map(subPage =>
          <SubPage
            key={subPage.id}
            id={subPage.id}
            imageSrc={subPage.photoUrl}
            name={subPage.name}
            />
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
