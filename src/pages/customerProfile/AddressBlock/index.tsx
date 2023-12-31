import { useState } from 'react';
import { AddressItem } from './AddressItem/AddressItem';
import { makeAddressChangeAction } from './makeAddressChangeAction';
import { isBodyScroll } from '../../../components/BodyBlinder/toggleBodyScrolling';
import { AddressEditModal } from './AddressEditModal';
import { handleAddressChange } from './helpers/handleAddressChange';
import { handleAddressLabelChange } from './helpers/handleAddressLabelChange';
import { handleDefaultAddressIdChange } from './helpers/handleDefaultAddressIdChange';
import { getInitialAddressesData } from './getInitialAddressData';
import {
  StyledAddAddressBtn,
  StyledAddressBlockWrapper,
  StyledAddressList,
} from './style';
import {
  IAddress,
  ICustomer,
  IDraftAddress,
} from '../../../types/customerTypes';
import { ActionType } from '../customerProfileData/types';
import {
  type ICustomerNewAddressInitialData,
  type IOperationsWithAddress,
  IAddressEditFormFields,
  IEditedAddress,
} from './type';
import { customerChangeActions } from '../listOfChangeActions';
import { handleAddressAdd } from './helpers/handleAddressAdd';
import { handleDefaultAddressKeyAdd } from './helpers/handleDefaultAddressKeyAdd';

export function AddressBlock({ customer }: { customer: ICustomer }) {
  const [editedAddress, setEditedAddress] = useState<IEditedAddress>(null);

  const modalControlls = {
    showModal(address: IAddress | ICustomerNewAddressInitialData) {
      isBodyScroll(false);
      setEditedAddress(address);
    },
    hideModal() {
      isBodyScroll(true);
      setEditedAddress(null);
    },
  };

  const initialAddressesData = getInitialAddressesData(customer);

  const [currentAddressesData, setCurrentAddressesData] =
    useState<typeof initialAddressesData>(initialAddressesData);

  const {
    addresses,
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
  } = currentAddressesData;

  const operationsWithAddress: IOperationsWithAddress = {
    removeAddress(id: string) {
      const newAddressesState = {
        addresses: addresses.filter(({ id: addId }) => addId !== id),
        billingAddressIds: billingAddressIds.filter(
          (billingId) => billingId !== id
        ),
        shippingAddressIds: shippingAddressIds.filter(
          (shippingId) => shippingId !== id
        ),
        defaultBillingAddressId:
          defaultBillingAddressId === id ? undefined : defaultBillingAddressId,
        defaultShippingAddressId:
          defaultShippingAddressId === id
            ? undefined
            : defaultShippingAddressId,
      };
      const newAction = makeAddressChangeAction(ActionType.REMOVE_ADDRESS, {
        id,
      });
      customerChangeActions.addCustomerChangeAction(newAction);
      setCurrentAddressesData(newAddressesState);
    },
    changeAddress({
      id,
      country,
      postalCode,
      city,
      streetName,
      billingAddress: isBilling,
      shippingAddress: isShipping,
      defaultBilling: isDefaultBilling,
      defaultShipping: isDefaultShipping,
    }: IAddressEditFormFields) {
      if (!id) throw new Error('"id" must be frovided for field change');
      if (!country) throw new Error('"country" can\'t be empty string');

      const updatedAddress = {
        id,
        country,
        postalCode,
        streetName,
        city,
      };
      const newAddresses = handleAddressChange({ addresses, updatedAddress });
      const newBillingAddressIds = handleAddressLabelChange({
        billing: true,
        addressIds: billingAddressIds,
        id,
        isLabeled: isBilling,
      });
      const newShippingAddressIds = handleAddressLabelChange({
        addressIds: shippingAddressIds,
        id,
        isLabeled: isShipping,
      });
      const newDefaultBillingAddressId = handleDefaultAddressIdChange({
        labeledIds: newBillingAddressIds,
        defaultId: defaultBillingAddressId,
        id,
        isDefault: isDefaultBilling,
        billing: true,
      });
      const newDefaultShippingAddressId = handleDefaultAddressIdChange({
        labeledIds: newShippingAddressIds,
        defaultId: defaultShippingAddressId,
        id,
        isDefault: isDefaultShipping,
      });

      const newCurrentAddressData = {
        addresses: newAddresses,
        billingAddressIds: newBillingAddressIds,
        shippingAddressIds: newShippingAddressIds,
        defaultBillingAddressId: newDefaultBillingAddressId,
        defaultShippingAddressId: newDefaultShippingAddressId,
      };

      setCurrentAddressesData(newCurrentAddressData);

      modalControlls.hideModal();
    },
    addNewAddress({
      city,
      country,
      postalCode,
      streetName,
      billingAddress: isBilling,
      shippingAddress: isShipping,
      defaultBilling: isDefaultBilling,
      defaultShipping: isDefaultShipping,
    }: IAddressEditFormFields) {
      if (!country) throw new Error('"country" can\'t be empty string');

      const key = String(Date.now());

      const newAddress: IDraftAddress = {
        country,
        postalCode,
        streetName,
        city,
        key,
      };

      const newAddresses = handleAddressAdd({ newAddress, addresses });
      const newBillingAddressIds = handleAddressLabelChange({
        billing: true,
        addressIds: billingAddressIds,
        key,
        isLabeled: isBilling,
      });
      const newShippingAddressIds = handleAddressLabelChange({
        addressIds: shippingAddressIds,
        key,
        isLabeled: isShipping,
      });
      const newDefaultBillingAddressId = handleDefaultAddressKeyAdd({
        billing: true,
        prevDefaultId: defaultBillingAddressId,
        isDefault: isDefaultBilling,
        key,
      });
      const newDefaultShippingAddressId = handleDefaultAddressKeyAdd({
        isDefault: isDefaultShipping,
        prevDefaultId: defaultShippingAddressId,
        key,
      });

      const newCurrentAddressData = {
        addresses: newAddresses,
        billingAddressIds: newBillingAddressIds,
        shippingAddressIds: newShippingAddressIds,
        defaultBillingAddressId: newDefaultBillingAddressId,
        defaultShippingAddressId: newDefaultShippingAddressId,
      };

      setCurrentAddressesData(newCurrentAddressData);

      modalControlls.hideModal();
    },
  };

  const addressItems = addresses.map((address) => {
    const { id } = address;
    return AddressItem({
      address,
      operationsWithAddress,
      showModal: modalControlls.showModal,
      isBilling: billingAddressIds.includes(id),
      isShipping: shippingAddressIds.includes(id),
      isDefaultBilling: id === defaultBillingAddressId,
      isDefaultShipping: id === defaultShippingAddressId,
    });
  });

  const handleAddAddressBtnClick = () => {
    const addressAddInitialData: ICustomerNewAddressInitialData = {
      city: '',
      country: '',
      postalCode: '',
      streetName: '',
    };
    modalControlls.showModal(addressAddInitialData);
  };

  return (
    <StyledAddressBlockWrapper>
      <StyledAddressList>{addressItems}</StyledAddressList>
      <StyledAddAddressBtn onClick={handleAddAddressBtnClick}>
        Add address
      </StyledAddAddressBtn>
      {editedAddress !== null && (
        <AddressEditModal
          oldAddress={editedAddress}
          cancelEdit={modalControlls.hideModal}
          operationsWithAddress={operationsWithAddress}
          billingAddressIds={billingAddressIds}
          shippingAddressIds={shippingAddressIds}
          defaultBillingAddressId={defaultBillingAddressId}
          defaultShippingAddressId={defaultShippingAddressId}
        />
      )}
    </StyledAddressBlockWrapper>
  );
}
