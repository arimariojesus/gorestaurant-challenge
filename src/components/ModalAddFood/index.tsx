import { ReactElement, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { iFood } from '../../types';

interface ModalAddFoodProps {
  setIsOpen: () => void;
  handleAddFood: (food: iFood) => void;
  isOpen: boolean;
}

const ModalAddFood = ({ handleAddFood, isOpen, setIsOpen }: ModalAddFoodProps): ReactElement => {
  const formRef = useRef(null);

  console.log(isOpen);

  const handleSubmit = async (data: iFood) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setIsOpen()}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
