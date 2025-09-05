# DevContainer Clone Extension

A Cursor extension that implements missing DevContainer commands from the VSCode DevContainers extension.

## Objective

This repository aims to bridge the gap between VSCode's DevContainers extension and Cursor by implementing the missing DevContainer commands. The extension will provide developers with the same powerful containerized development experience they're used to in VSCode.

## Implementation Priorities

### Phase 1 - Base Infrastructure (Critical Priority)
1. **Docker Infrastructure**: Docker Engine, CLI, API
2. **Git Infrastructure**: Git CLI, authentication
3. **VSCode/Cursor Infrastructure**: Extension API, command palette
4. **DevContainer CLI Infrastructure**: Official CLI tool, authentication, configuration

### Phase 2 - Configuration Commands (High Priority)
1. **Add Development Container Configuration Files**: Base for all other commands
2. **Try a Development Container Sample**: Demonstration and testing

### Phase 3 - Opening Commands (High Priority)
1. **Open Folder in Container**: Basic functionality
2. **Open Workspace in Container**: Extension of basic functionality

### Phase 4 - Management Commands (Medium Priority)
1. **Rebuild and Reopen in Container**: Lifecycle management
2. **Attach to Running Container**: Management of existing containers
3. **Show Container Log**: Debug and monitoring
4. **Show Container Definition**: Debug and inspection

### Phase 5 - Advanced Commands (Medium Priority)
1. **Clone Repository in Container Volume**: Complex functionality
2. **Explore a Volume in a Dev Container**: Exploration and debug

### Phase 6 - Support Commands (Low Priority)
1. **Install Dev Container CLI**: Command line tool support
2. **Add/Remove Extension to/from devcontainer.json**: Extension management

This hierarchical structure ensures that each level builds on solid foundations and enables iterative and testable development. The implementation order respects the natural dependencies between commands and their underlying components.

## Documentation

See [`docs/README.md`](docs/README.md) for detailed analysis of commands, user journeys, dependencies, and implementation hierarchy.

## Contributing

This project follows a structured approach with each command implemented in dedicated branches, starting with foundational infrastructure and building up to complex features.
