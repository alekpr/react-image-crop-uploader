import React, { useState } from 'react';
import { BasicExample } from './basic';
import { WithCroppingExample } from './with-cropping';
import { EditModeExample } from './edit-mode';
import { DirectUploadExample } from './direct-upload';
import { CropTest } from './crop-test';
import { InitialImagesCropTest } from './initial-images-crop-test';
import '../index.css';

const examples = [
  { id: 'basic', name: 'Basic Upload', component: BasicExample },
  { id: 'cropping', name: 'With Cropping', component: WithCroppingExample },
  { id: 'edit-mode', name: 'Edit Mode', component: EditModeExample },
  { id: 'direct-upload', name: 'Direct Upload', component: DirectUploadExample },
  { id: 'crop-test', name: 'Crop Test', component: CropTest },
  { id: 'initial-images-crop', name: 'Initial Images Crop Test', component: InitialImagesCropTest },
];

const App: React.FC = () => {
  const [activeExample, setActiveExample] = useState('initial-images-crop');

  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component || BasicExample;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <div style={{ 
        width: '250px', 
        backgroundColor: '#f8f9fa', 
        padding: '1rem', 
        borderRight: '1px solid #dee2e6'
      }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          Examples
        </h2>
        <nav>
          {examples.map((example) => (
            <button
              key={example.id}
              onClick={() => setActiveExample(example.id)}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                backgroundColor: activeExample === example.id ? '#007bff' : 'transparent',
                color: activeExample === example.id ? 'white' : '#333',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeExample !== example.id) {
                  e.currentTarget.style.backgroundColor = '#e9ecef';
                }
              }}
              onMouseLeave={(e) => {
                if (activeExample !== example.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {example.name}
            </button>
          ))}
        </nav>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>🔧 Test Focus</h4>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#856404' }}>
            <strong>Initial Images Crop Test</strong> - Tests the new URL cropping functionality for initial images.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <ActiveComponent />
      </div>
    </div>
  );
};

export default App;