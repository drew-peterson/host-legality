import React from 'react';

import { Container, H1, rem, Subheader, Button } from '../../components/common';
import ChoosePlanForm from './ChoosePlanForm';
import ConfirmPlanPaymentForm from './ConfirmPlanPaymentForm';

export default props => {
  const {
    page,
    previousPage,
    nextPage,
    onSubmitForm,
    plans,
    property,
    form,
    planType
  } = props;
  const renderBackBtn = () => {
    if (page > 1) {
      return <Button onClick={previousPage}>BACK</Button>;
    }
    return <Button to="/dashboard">BACK</Button>;
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <ChoosePlanForm form={form} onSubmit={nextPage} plans={plans} />;
      case 2:
        return (
          <ConfirmPlanPaymentForm
            form={form}
            onSubmit={onSubmitForm}
            plans={plans}
            planType={planType}
          />
        );
      default:
        return <ChoosePlanForm form={form} onSubmit={nextPage} plans={plans} />;
    }
  };

  const styles = {
    headerStyle: {
      maxWidth: rem(632),
      margin: '0 auto'
    },
    addressSubHeaderStyle: {
      textAlign: 'center'
    }
  };

  return (
    <Container>
      {renderBackBtn()}
      <H1 style={styles.headerStyle}>Which package would you like for:</H1>
      {property && (
        <Subheader style={styles.addressSubHeaderStyle}>
          {property.address}
        </Subheader>
      )}
      {renderPage()}
    </Container>
  );
};
