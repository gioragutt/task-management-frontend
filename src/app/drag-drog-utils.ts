import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

export const wrapDropEvent = <T>({ container, previousContainer, currentIndex, previousIndex }: CdkDragDrop<T[]>) => {
  return {
    droppedItem: previousContainer.data[previousIndex],
    isSameContainer: container === previousContainer,
    transfer() {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
    },
    transferBack() {
      transferArrayItem(container.data, previousContainer.data, currentIndex, previousIndex);
    },
    updateTransferedItemTo(to: T) {
      container.data[currentIndex] = to;
    },
  };
};
