import React, { Component } from 'react';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { fetchPagesIndex } from '../actions/entry';
import NavBar from '../../shared/components/NavBar';

class Entry extends Component {
  componentWillMount() {
    const { fetchPagesIndex } = this.props;
    fetchPagesIndex();
  }

  render() {

    const { 
      pages,
      children 
    } = this.props;

    const pagesForNav = sortBy(pages, (page => page.position)).map(page => ({
      url: `/admin/pages/${page.id}`,
      copy: page.name
    }));

    return (
      <div>
        <NavBar
          navChildren={pagesForNav}
          />
        <div>
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pageData.pages
});

const mapDispatchToProps = dispatch => ({
  fetchPagesIndex: () => dispatch(fetchPagesIndex())
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
