import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Hook for managing multiple tabs/pages
export function useTabStorage() {
  const [tabs, setTabs] = useLocalStorage('videogen-tabs', [
    { id: 'tab-1', label: 'Project 1', active: true }
  ]);

  const [activeTabId, setActiveTabId] = useLocalStorage('videogen-active-tab', 'tab-1');

  const addTab = (label: string) => {
    const newTab = {
      id: `tab-${Date.now()}`,
      label,
      active: false
    };
    
    setTabs(prev => [
      ...prev.map(tab => ({ ...tab, active: false })),
      { ...newTab, active: true }
    ]);
    
    setActiveTabId(newTab.id);
  };

  const removeTab = (tabId: string) => {
    setTabs(prev => {
      const filtered = prev.filter(tab => tab.id !== tabId);
      if (filtered.length === 0) {
        // Always keep at least one tab
        return [{ id: 'tab-1', label: 'Project 1', active: true }];
      }
      
      // If we're removing the active tab, activate the first remaining tab
      if (tabId === activeTabId) {
        setActiveTabId(filtered[0].id);
        return filtered.map((tab, index) => ({
          ...tab,
          active: index === 0
        }));
      }
      
      return filtered;
    });
  };

  const setActiveTab = (tabId: string) => {
    setTabs(prev => prev.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
    setActiveTabId(tabId);
  };

  return {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    setActiveTab
  };
}