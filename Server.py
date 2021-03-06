from flask import Flask
import vgamepad as vg

app = Flask(__name__, static_url_path='', static_folder='public')

gamepad = vg.VX360Gamepad()

def getFloatFromHorizontalDirection(direction):
    if direction.lower() == 'left':
        return -1
    elif direction.lower() == 'right':
        return 1
    else:
        return 0

def getFloatFromVerticalDirection(vertical):
    if vertical.lower() == 'up':
        return 1
    elif vertical.lower() == 'down':
        return -1
    else:
        return 0

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/press/letter/<button>')
def pressLetterButton(button):
    gamepad.press_button(button=vg.XUSB_BUTTON['XUSB_GAMEPAD_' + button.upper()])
    gamepad.update()
    return '200'
    
@app.route('/release/letter/<button>')
def releaseLetterButton(button):
    gamepad.release_button(button=vg.XUSB_BUTTON['XUSB_GAMEPAD_' + button.upper()])
    gamepad.update()
    return '200'

@app.route('/move/stick/<side>/<x>/<y>')
def moveStick(side, x, y):
    func = getattr(gamepad, side.lower() + '_joystick_float')
    func(float(x), float(y))
    gamepad.update()
    return '200'

@app.route('/press/bumper/<side>')
def pressBumperButton(side):
    gamepad.press_button(button=vg.XUSB_BUTTON['XUSB_GAMEPAD_' + side.upper() + '_SHOULDER'])
    gamepad.update()
    return '200'
    
@app.route('/release/bumper/<side>')
def releaseBumperButton(side):
    gamepad.release_button(button=vg.XUSB_BUTTON['XUSB_GAMEPAD_' + side.upper() + '_SHOULDER'])
    gamepad.update()
    return '200'

@app.route('/press/trigger/<side>')
def pressTriggerButton(side):
    func = getattr(gamepad, side.lower() + '_trigger_float')
    func(1)
    gamepad.update()
    return '200'
    
@app.route('/release/trigger/<side>')
def releaseTriggerButton(side):
    func = getattr(gamepad, side.lower() + '_trigger_float')
    func(0)
    gamepad.update()
    return '200'

@app.route('/press/select')
def pressSelectButton():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK)
    gamepad.update()
    return '200'
    
@app.route('/release/select')
def releaseSelectButton():
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK)
    gamepad.update()
    return '200'

@app.route('/press/start')
def pressStartButton():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_START)
    gamepad.update()
    return '200'
    
@app.route('/release/start')
def releaseStartButton():
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_START)
    gamepad.update()
    return '200'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
