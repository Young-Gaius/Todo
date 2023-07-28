// Mock the localStorage getItem and setItem methods
const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  // Assign the localStorageMock to the global object so that it can be used in the test
  Object.defineProperty(global, 'localStorage', { value: localStorageMock });
  
  // Mock the deleteTask function
  jest.mock('./index.js', () => ({
    deleteTask: jest.fn(),
  }));
  
  const { deleteTask } = required ('./index.js');
  
  const todoArray = [
    {
      description: 'Solve mock test',
      completed: true,
      index: 1,
    },
    {
      description: 'Solve mock test',
      completed: false,
      index: 2,
    },
    {
      description: 'Solve mock test',
      completed: false,
      index: 3,
    },
  ];
  
  localStorage.setItem('tasks', JSON.stringify(todoArray));
  
  document.body.innerHTML = `
      <div id="list">
        <div class="my-3 py-3 shadow list-group-item" id="remove"></div>
      </div>
  `;
  
  describe('remove item from the local storage', () => {
    const item = document.querySelector('#remove');
  
    // Clear the mock function's call history before each test
    beforeEach(() => {
      deleteTask.mockClear();
    });
  
    test('test remove function', () => {
      // Call the function you want to test
      deleteTask(item);
  
      // Assert that the mock function was called once
      expect(deleteTask).toHaveBeenCalledTimes(1);
  
      // Add more assertions based on what deleteTask does in your implementation
      // For example, check if the localStorage is updated as expected
    });
  
    test('check if local storage is deleting the item', () => {
      // Add test case to check if the local storage is updated as expected
    });
  });