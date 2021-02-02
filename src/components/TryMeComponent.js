import handleViewport from 'react-in-viewport';

const Block = (props) => {
    const { inViewport, forwardedRef, enterCount } = props;
    const classNameVar = inViewport && enterCount === 1?"try":"try-static";
    return (
        <div ref={forwardedRef}>
            <div className="container">
                <div className={classNameVar} style={{ backgroundColor: "teal", height: '20vh' }}>
                    <span>Wanna Send goods to your loved ones?</span>
                </div></div>
        </div>
    );
};

const ViewportBlock = handleViewport(Block, /** options: {}, config: {} **/);

const Component = (props) => (
    <div>
        <div style={{ height: '100vh' }}>
            <h2>Scroll down to make component in viewport</h2>
        </div>
        <ViewportBlock onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />
    </div>
)

export default Component;