// Import the addTask function
const { addTask } = require('./index'); // Replace './your-code-file' with the actual path to your code file.

// Import jsdom and set up the DOM environment
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><div id="list"></div>');
global.document = dom.window.document;

// Mock the localStorage using jest-localstorage-mock
const localStorageMock = require('jest-localstorage-mock');
global.localStorage = localStorageMock;

// Test cases for the addTask function
describe('addTask', () => {
  test('should add a task to tasks array and update localStorage', () => {
    // Arrange
    const initialTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    expect(initialTasks).toHaveLength(0);

    // Act
    addTask('Task 1');

    // Assert
    const updatedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].description).toBe('Task 1');
    expect(updatedTasks[0].completed).toBe(false);
    expect(updatedTasks[0].index).toBe(1);
  });

  test('should add another task with correct index', () => {
    // Arrange
    addTask('Task 1'); // The first task should have index 1
    const initialTasks = JSON.parse(localStorage.getItem('tasks'));

    // Act
    addTask('Task 2');

    // Assert
    const updatedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(updatedTasks).toHaveLength(2);
    expect(updatedTasks[1].description).toBe('Task 2');
    expect(updatedTasks[1].index).toBe(initialTasks.length + 1);
  });
});