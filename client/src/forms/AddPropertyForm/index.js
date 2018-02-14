import React from 'react';
import AddressForm from './AddressForm';
import SelectHostForm from './SelectHostForm';

export default props => {
  const { page, nextPage, onSubmitForm, previousPage } = props;

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <AddressForm
            nextBtnText="next"
            form="getStarted"
            onSubmit={nextPage}
          />
        );
      case 2:
        return (
          <SelectHostForm
            btnText="Submit"
            form="getStarted"
            onSubmit={onSubmitForm}
          />
        );
      default:
        return (
          <AddressForm
            nextBtnText="next"
            form="getStarted"
            onSubmit={nextPage}
          />
        );
    }
  };
  return (
    <div>
      {page > 1 && (
        <span style={styles.backButton} onClick={previousPage}>
          BACK
        </span>
      )}

      {renderPage()}
    </div>
  );
};

const styles = {
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0
  }
};
