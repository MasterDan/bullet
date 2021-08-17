# Sandbox
## Work in progress

### Конфигурация для отладки в браузере
```json
{
    "name": "Launch Chrome",
    "request": "launch",
    // "preLaunchTask": "npm: serve",
    "type": "pwa-chrome",
    "url": "http://localhost:9000",
    "webRoot": "${workspaceFolder}/src",
    "sourceMaps": true,
    "sourceMapPathOverrides": {
    "webpack:///./~/*": "${workspaceFolder}/node_modules/*",
    "webpack:///./src/*": "${workspaceFolder}/src/*",
    "webpack://?:*/*": "${workspaceFolder}/*"
    }
}
```